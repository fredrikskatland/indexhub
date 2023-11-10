from django.shortcuts import render
from rest_framework import generics, status
from .serializers import VectorStoreSerializer, UsersSerializer, CreateVectorStoreSerializer
from .models import VectorStore, Users

from rest_framework.views import APIView
from rest_framework.response import Response

import os
from django.http import FileResponse, Http404
from django.conf import settings

# Create your views here.

class VectorStoreView(generics.ListAPIView):
    queryset = VectorStore.objects.all()
    serializer_class = VectorStoreSerializer

class UsersView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class CreateVectorStoreView(APIView):
    def post(self, request, format=None):
        serializer = CreateVectorStoreSerializer(data=request.data)
        if serializer.is_valid():
            vector_store = serializer.save()
            media_file = request.FILES.get('media_file')
            if media_file:
                # Save the file
                vector_store.media_url = media_file.name
                file_path = os.path.join(settings.MEDIA_ROOT, 'vectorstore_databases', media_file.name)
                with open(file_path, 'wb+') as destination:
                    for chunk in media_file.chunks():
                        destination.write(chunk)
                vector_store.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
    
def download_vector_index(request, filename):
    # Define the path to your vector store indexes
    file_path = os.path.join(settings.MEDIA_ROOT, 'vector_indexes', filename)
    
    # Check if file exists
    if os.path.exists(file_path):
        # Serve the file using FileResponse
        response = FileResponse(open(file_path, 'rb'), as_attachment=True)  # as_attachment will prompt download
        return response
    else:
        # If file does not exist, return 404
        raise Http404("Vector index does not exist")
