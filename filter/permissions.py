from rest_framework import permissions


class IsStaffPermission(permissions.BasePermission):
    """
    Global permission check if the user is staff or not
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user is not None and str(request.user) != 'AnonymounsUser' and request.user.is_staff
