# Generated by Django 4.0.5 on 2022-06-27 23:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
        ),
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=200)),
                ('position', models.CharField(max_length=20)),
                ('english', models.CharField(default=' ', max_length=100)),
                ('definition', models.TextField(default=' ')),
                ('notes', models.TextField(default=' ')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dictionary.language')),
            ],
        ),
    ]
