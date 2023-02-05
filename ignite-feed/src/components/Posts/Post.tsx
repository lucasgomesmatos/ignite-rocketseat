import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FormEvent, useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Comment } from '../Comment/Comment';
import styles from './Post.module.css';

interface IAuthor {
  avatarUrl: string;
  name: string;
  role: string;
}

interface IContent {
  type: string;
  content: string;
}

interface IPostProps {
  id?: number;
  author: IAuthor;
  content: IContent[];
  publishedAt: Date;
}

export const Post = ({ author, content, publishedAt }: IPostProps) => {
  const publishedAtDateFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  );

  const publishedAtDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const [comments, setComments] = useState(['Post muito bacana, hein!']);
  const [newCommentText, setNewCommentText] = useState('');

  function handleCreateNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log([...comments, newCommentText]);
    setComments([...comments, newCommentText]);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedAtDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === 'paragraph') {
            return <p>{item.content}</p>;
          } else if (item.type === 'link') {
            return <a href="">{item.content}</a>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={author.name}
            comment={comment}
            author={author}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </article>
  );
};
