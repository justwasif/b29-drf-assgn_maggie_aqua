from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DiscussionThreadViewSet, CommentViewSet

router = DefaultRouter()
router.register('threads', DiscussionThreadViewSet, basename='threads')
router.register('comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
]