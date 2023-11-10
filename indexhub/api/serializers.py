from rest_framework import serializers
from .models import VectorStore, Users

class VectorStoreSerializer(serializers.ModelSerializer):
    full_media_url = serializers.SerializerMethodField()

    class Meta:
        model = VectorStore
        fields = ['code', 'title', 'description', 'owner', 'createdon', 'updatedon', 'published', 'media_url', 'full_media_url']
    
    def get_full_media_url(self, obj):
        return obj.get_absolute_media_url()
        
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'password', 'email', 
                  'createdon', 'updatedon', 'isactive')
        
class CreateVectorStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorStore
        fields = ('code','title', 'description', 
                  'owner', 'createdon', 'updatedon', 'published', 'media_url')