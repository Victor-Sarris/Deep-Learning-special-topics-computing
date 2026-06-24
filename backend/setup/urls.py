from django.contrib import admin
from django.urls import path
from api.views import predict_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("predict", predict_view, name="predict"),
]
