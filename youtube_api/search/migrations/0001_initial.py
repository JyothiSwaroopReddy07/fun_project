# Generated by Django 5.0.1 on 2024-01-25 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('id', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('thumbnail', models.TextField()),
                ('publishedAt', models.DateTimeField()),
                ('duration', models.IntegerField()),
                ('viewCount', models.IntegerField()),
                ('likeCount', models.IntegerField()),
                ('favoriteCount', models.IntegerField()),
                ('commentCount', models.IntegerField()),
            ],
            options={
                'db_table': 'Videos',
            },
        ),
    ]
