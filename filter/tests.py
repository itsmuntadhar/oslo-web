from django.contrib.auth.models import User
from django.test import TestCase
from json import dumps
from rest_framework.test import APIClient

from .models import Word
from . import choices


class TextTestCase(TestCase):
    """
    testing the filter
    """

    def setUp(self):
        """
        creating a user and adding some words
        """
        User.objects.create_superuser(
            username='superuser',
            email='superuser@email.com',
            password='Str0ngP@55'
        )

        User.objects.create_user(
            username='someuser',
            email='some@email.com',
            password='P@55w0rd'
        )
        Word.objects.create(
            user=User.objects.get(pk=1),
            word='كس',
            severity=choices.SEVERITY_HIGH
        )
        Word.objects.create(
            user=User.objects.get(pk=1),
            word='كسخت',
            severity=choices.SEVERITY_HIGH
        )

    def test_add_word(self):
        """
        test if adding words works :/
        """
        test_client = APIClient()
        resp = test_client.post(
            '/rest-auth/login/', dumps({'username': 'someuser',
                                        'password': 'P@55w0rd'}), content_type='application/json'
        )
        self.assertEqual(resp.status_code, 200, resp)
        key = resp.json()['key']
        resp = test_client.post(
            '/api/words/', dumps({'word': 'cunt', 'severity': 2}), content_type='application/json'
        )
        self.assertNotEqual(resp.status_code, 200, resp)
        self.assertEqual(resp.status_code, 403, resp)

    def test_filter(self):
        """
        actual test :/
        """
        test_client = APIClient()
        resp = test_client.post(
            '/api/filter/', dumps({'text': 'تجربة الـAPI'}), content_type='application/json')
        json = resp.json()
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(len(json.keys()), 3)
        self.assertEqual(json['count'], 0)

        resp = test_client.post(
            '/api/filter/', dumps({'text': 'كسخت هالسالفة كُس'}), content_type='application/json')
        json = resp.json()
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(json.keys()), 3)
        self.assertEqual(json['count'], 2, json)
