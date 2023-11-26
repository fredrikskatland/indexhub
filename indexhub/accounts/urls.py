from django.urls import path
from .views import register_user, CustomUserView, login_user

urlpatterns = [
    # ... other urls ...
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login_user'),
    path('customusers', CustomUserView.as_view()),
    
]
