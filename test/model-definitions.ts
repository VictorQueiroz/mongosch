import { Model } from "../src/schema/Model";
import ContentParagraph from "./ContentParagraph";
import { ContentUserInterface } from "./ContentUserInterface";
import Post from "./Post";
import Story from "./Story";
import StoryChapter from "./StoryChapter";
import User from "./User";

const models: (Model | (() => Model))[] = [
  Post,
  ContentUserInterface,
  User,
  ContentParagraph,
  Story,
  StoryChapter
];

export default models;
