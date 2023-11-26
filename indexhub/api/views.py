from django.shortcuts import render
from rest_framework import generics, status
from .serializers import VectorStoreSerializer, UsersSerializer, CreateVectorStoreSerializer, FileMetadataSerializer
from .models import VectorStore, Users, FileMetadata

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


import os
import hashlib

from django.http import FileResponse, Http404
from django.conf import settings

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError



import zipfile
import os

from .utils import verify_chroma_db, retriever

# Create your views here.

class VectorStoreView(generics.ListAPIView):
    queryset = VectorStore.objects.all()
    serializer_class = VectorStoreSerializer

class UsersView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class CreateVectorStoreView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        serializer = CreateVectorStoreSerializer(data=request.data)
        if serializer.is_valid():
            # Fetch the logged-in user
            user = request.user
            if not user.is_authenticated:
                return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

            # Create the VectorStore with the current user as the owner
            vector_store = serializer.save(owner=user)
            media_file = request.FILES.get('media_file')

            if media_file:
                # Save the file
                file_path = os.path.join(settings.MEDIA_ROOT, 'vectorstore_databases', media_file.name)
                with open(file_path, 'wb+') as destination:
                    file_hash = hashlib.sha256()
                    for chunk in media_file.chunks():
                        destination.write(chunk)
                        file_hash.update(chunk)

                # Update media_url
                vector_store.media_url = media_file.name
                vector_store.save()

                # Verify the uploaded file
                verification = verify_chroma_db(file_path)
                print(verification)
                if verification != "Error: File is not a valid Chroma database":
                    # Proceed with saving metadata and response
                    # Save file metadata
                    file_metadata = FileMetadata(
                        filename=media_file.name,
                        filesize=media_file.size,
                        filehash=file_hash.hexdigest(),
                        vectorstore=vector_store,
                        metadatafields=verification
                    )
                    file_metadata.save()

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "Invalid file format"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# retrieve response from vectorstore as retriever
class RetrieverView(APIView):
    def post(self, request, format=None):
        try:
            query = request.data['query']
            
            result = retriever(str(query))
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)


    
class FileMetadataView(generics.ListAPIView):
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer

class FileMetadataByVectorStoreView(APIView):
    def get(self, request, vectorstore_id):
        file_metadata = FileMetadata.objects.filter(vectorstore_id=vectorstore_id)
        serializer = FileMetadataSerializer(file_metadata, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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

#@csrf_exempt
#def create_vectorstore(request):
#    if request.method == 'POST':
#        # Extract data from request
#        title = request.POST.get('title')
#        description = request.POST.get('description')
#        owner = request.POST.get('owner')
#        published = request.POST.get('published') == 'true'
#        media_file = request.FILES.get('media_file')
#
#        # Validate file (example)
#        if not media_file.name.endswith('.zip'):
#            return JsonResponse({'error': 'Invalid file format'}, status=400)
#
#        # Extract and save file metadata
#        file_metadata = FileMetadata(
#            name=media_file.name,
#            size=media_file.size,
#            # other metadata fields...
#        )
#        file_metadata.save()
#
#        # Save main entry
#        vectorstore = VectorStore(
#            title=title,
#            description=description,
#            owner=owner,
#            published=published,
#            media_url=media_file.name,  # or another way to reference the file
#            file_metadata=file_metadata,  # Linking to the metadata entry
#        )
#        vectorstore.save()
#
#        return JsonResponse({'message': 'VectorStore created successfully'})
#    return JsonResponse({'error': 'Invalid request'}, status=400)
