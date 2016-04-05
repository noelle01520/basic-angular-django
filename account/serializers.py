from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from .models import Account


class AccountSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    new_username = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username','created_at', 'updated_at',
                  'first_name', 'last_name', 'password', 'confirm_password',
                  'new_username')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)
        self.password_validation(password, confirm_password)
        return Account.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('new_username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password or confirm_password:
            self.password_validation(password, confirm_password)
            instance.set_password(password)
            instance.save()


        update_session_auth_hash(self.context.get('request'), instance)

        return instance

    def password_validation(self, password, confirm_password):
        if not password or \
            not confirm_password or \
            password != confirm_password:
            raise serializers.ValidationError('Password and Confirm Password must match.')