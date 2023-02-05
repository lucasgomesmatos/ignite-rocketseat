import { ThumbsUp, Trash } from 'phosphor-react';
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
}

export const Comment = ({ author, comment, publishedAt }: ICommentProps) => {
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
            <button title="deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{comment}</p>
        </div>
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>22</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
