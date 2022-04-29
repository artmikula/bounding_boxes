from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from apps.serializers import FileSerializer

import os
from apps.utils import is_image
from apps import file_upload_path
from django.http.request import QueryDict

from apps.model.darkflow import PostureDetector

# Create your views here.
class PostureDetectionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, req, *args, **kwargs):
        return Response("GET OK", status=status.HTTP_200_OK)

    def post(self, req, *args, **kwargs):
        # get requested data      
        new_data = req.data.dict()
        
        # requested file object
        file_name = req.data['file_name']
        
        # create full path for saving file        
        new_file_full_name = file_upload_path(file_name.name)
        
        # new file path
        file_path = '/'.join(new_file_full_name.split('/')[0:-1])        
        
        # file extension
        file_ext = os.path.splitext(file_name.name)[1]
        
        # add new data to QueryDict(for mapping with DB)
        new_data['file_ext'] = file_ext
        new_data['is_img'] = is_image(file_ext)
        new_data['file_path'] = file_path
        new_data['file_origin_name'] = req.data['file_name'].name
        new_data['file_save_name'] = req.data['file_name']
        
        new_query_dict = QueryDict('', mutable=True)
        new_query_dict.update(new_data)

        file_serializer = FileSerializer(data = new_query_dict)
        if file_serializer.is_valid():
            
            file_serializer.save()
            print("save complete:", file_serializer.data)
            
            model = PostureDetector()
            
            results = model.detect(file_serializer.data['file_save_name'])
                 
            return Response(results, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)