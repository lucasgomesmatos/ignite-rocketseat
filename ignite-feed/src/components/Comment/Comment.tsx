import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from '../Avatar/Avatar';

interface IAuthor {
  avatarUrl: string;
  name: string;
  role: string;
}

interface ICommentProps {
  author: IAuthor;
  comment: string[];
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
              <time title="11 de maio às 08:13h" dateTime="2022-05-11 08:13:30">
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
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
