import { useSession, signIn } from 'next-auth/react';
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-js';
import styles from './style.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubribe() {
    if (!session) {
      signIn('github');
      return;
    }

    // criação do checkout session
    try {
      const response = await api.post('subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubribe}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
