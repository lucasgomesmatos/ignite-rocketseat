import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './Comment.module.css';

interface IAuthor {
  avatarUrl: string;
  name: string;
  role: string;
}

interface ICommentProps {
  author: IAuthor;
  comment: string;
  publishedAt: Date;
  onDeleteComment: (comment: string) => void;
}

export const Comment = ({
  author,
  comment,
  publishedAt,
  onDeleteComment,
}: ICommentProps) => {
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeComment() {
    setLikeCount((old) => old + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title="11 de maio às 08:13h"
                dateTime={publishedAt.toUTCString()}
              >
                Cerca há 1h atrás
              </time>
            </div>
            <button
              onClick={() => onDeleteComment(comment)}
              title="deletar comentário"
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{comment}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
