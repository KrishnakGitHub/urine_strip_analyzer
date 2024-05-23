from django.db import models
import json

# Create your models here.
class UploadedImage(models.Model):
    image = models.ImageField(upload_to='./')
    colors = models.TextField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def set_colors(self, colors):
        self.colors = json.dumps(colors)

    def get_colors(self):
        return json.loads(self.colors)
    