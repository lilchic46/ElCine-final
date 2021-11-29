# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from django.urls import path, include  # add this
from apps.app.views import home

urlpatterns = [
    path('admin/', admin.site.urls),          # Django admin route
    path('', include("apps.authentication.urls")), # Auth routes - login / register
    path('browse/', include("apps.app.urls")),             # UI Kits Html files
    path('', home, name='home'),
    path("api/", include("apps.elcine.urls")),
]
