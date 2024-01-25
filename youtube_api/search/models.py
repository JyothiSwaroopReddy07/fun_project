from django.db import models

# Create your models here.

class Videos(models.Model):
    id = models.CharField(max_length=15,primary_key=True,blank=False) #max_length of youtube video Id is 11.
    title = models.TextField() # text field as length may vary,it can be efficient way to store.
    thumbnail = models.TextField()
    publishedAt = models.DateTimeField()
    duration = models.IntegerField()
    viewCount = models.IntegerField()
    likeCount = models.IntegerField()
    favoriteCount = models.IntegerField()
    commentCount = models.IntegerField()

    class Meta:
        db_table = 'Videos'
    
    def __str__(self) -> str:
        return str(self.id)

