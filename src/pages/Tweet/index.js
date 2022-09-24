import moment from 'moment';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@components/Header';
import ImageCard from '@components/ImageCard';
import CommentCard from '@components/CommentCard';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import styles from './index.module.scss';

const Tweet = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  useEffect(() => {
    setData(location.state);
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={data.user.profile_image_url}
                alt=""
              />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.name}>{data.user.name}</div>
              <div className={styles.username}>
                @
                {data.user.username}
              </div>
            </div>
          </div>
          <div className={styles.text}>
            {data.text}
          </div>
          {data.media_urls.length > 0 && (
          <div className={styles.photo}>
            <ImageCard
              imgs={data.media_urls}
              replyCnt={data.comments_count}
              retweetCnt={data.retweet_count}
              likeCnt={data.likes_count}
            />
          </div>
          )}
        </div>
        <div className={styles.time}>
          {`${moment(data.created_at).format('hh:mm A · MMM Do, YYYY')}`}
         &nbsp;&#183;&nbsp; Twittuer for iPhone
        </div>
        <div className={styles.bar}>
          <Bar
            dataSrc={data}
            id={data.id}
            replyCnt={data.comments_count}
            retweetCnt={data.retweet_count}
            likeCnt={data.likes_count}
            type={BAR_TYPE_KEYS.TWEET}
          />
        </div>
      </div>
      {data.comments.map((item) => (<CommentCard key={item.id} data={item} />))}
    </>
  );
};

export default Tweet;