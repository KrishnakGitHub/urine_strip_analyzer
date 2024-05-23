import cv2
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UploadedImage
from .serializers import UploadedImageSerializer


def analyze_image(file_path):
    image = cv2.imread(file_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    colors = []
    height, width, _ = image.shape
    strip_height = height // 10

    for i in range(10):
        segment = image_rgb[i * strip_height:(i + 1) * strip_height, :]
        average_color = segment.mean(axis=0).mean(axis=0)
        colors.append(tuple(map(int, average_color)))

    return colors


class UploadImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['file']
        image_instance = UploadedImage(image=file_obj)
        image_instance.save()
        file_path = image_instance.image.path
        print(file_path)
        colors = analyze_image(file_path)
        image_instance.set_colors(colors)
        image_instance.save()
        return Response(image_instance.get_colors())


@api_view(['GET'])
def tests_list(request):
    if request.method == 'GET':
        tests = UploadedImage.objects.all().order_by('-uploaded_at')
        serializer = UploadedImageSerializer(tests, many=True)
    return Response(serializer.data)