import { Db } from 'mongodb';
import { PostModel } from './Post';
import { ContentUserInterfaceModel } from './ContentUserInterface';
import { UserModel } from './User';
import { ContentParagraphModel } from './ContentParagraph';
import { StoryModel } from './Story';
import { StoryChapterModel } from './StoryChapter';
export class DatabaseClient {
  public readonly Post: PostModel;
  public readonly ContentUserInterface: ContentUserInterfaceModel;
  public readonly User: UserModel;
  public readonly ContentParagraph: ContentParagraphModel;
  public readonly Story: StoryModel;
  public readonly StoryChapter: StoryChapterModel;
  public constructor(db: Db) {
    this.Post = new PostModel(
      db.collection('posts'),
      db.collection('users')
    )
    this.ContentUserInterface = new ContentUserInterfaceModel(
      db.collection('contentUserInterfaces'),
      db.collection('contentParagraphs')
    )
    this.User = new UserModel(
      db.collection('users')
    )
    this.ContentParagraph = new ContentParagraphModel(
      db.collection('contentParagraphs'),
      db.collection('contentUserInterfaces')
    )
    this.Story = new StoryModel(
      db.collection('stories'),
      db.collection('users')
    )
    this.StoryChapter = new StoryChapterModel(
      db.collection('storyChapters'),
      db.collection('users'),
      db.collection('stories'),
      db.collection('contentParagraphs'),
      db.collection('contentUserInterfaces')
    )
  }
}
