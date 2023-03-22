from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Student
from .serializer import StudentSerializer

class StudentApiView(APIView):
    def get(self, request: Request, *args, **kwargs):
        all_students = Student.objects.all()
        serializer = StudentSerializer(all_students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        data = {
            "first_name": request.data.get("first_name"),
            "last_name": request.data.get("last_name"),
            "year_joined": request.data.get("year_joined"),
            "date_of_birth": request.data.get("date_of_birth"),
            "faculty": request.data.get("faculty"),
            "country": request.data.get("country"),
        }
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request: Request, *args, **kwargs):
        pk = request.query_params.get("id")
        stud = Student.objects.filter(pk=pk)
        serializer = StudentSerializer(data=stud)
        stud.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)