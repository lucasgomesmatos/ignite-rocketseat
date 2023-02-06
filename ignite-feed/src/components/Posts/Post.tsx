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
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleDeleteComment(comment: string) {
    console.log(comment);
    const commentWithoutDeleteOne = comments.filter((item) => item !== comment);

    setComments(commentWithoutDeleteOne);
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
            return (
              <div key={item.content}>
                <p>{item.content}</p>
              </div>
            );
          } else if (item.type === 'link') {
            return (
              <div key={item.content}>
                <a href="">{item.content}</a>
              </div>
            );
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
            key={comment}
            comment={comment}
            author={author}
            publishedAt={publishedAt}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  );
};
