import { GithubFilled, LinkedinFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import classes from './StartScreen.module.css';

const TMATE1 = [
  'Roman',
  'https://cdni.iconscout.com/illustration/premium/thumb/farmer-holding-umbrella-5481939-4591517.png',
  'https://github.com/rdaniliuk',
  'https://www.linkedin.com/in/roman-daniliuk-6083b612a/',
];
const TMATE2 = [
  'Oleksandr',
  'https://cdni.iconscout.com/illustration/premium/thumb/delivery-in-rain-5402140-4518110.png',
  'https://cdni.iconscout.com/illustration/premium/thumb/farmer-holding-umbrella-5481939-4591517.png',
  'https://github.com/Alexander-M-rss',
  '',
];
const TMATE3 = [
  'Daniil',
  'https://cdni.iconscout.com/illustration/premium/thumb/male-engineer-holding-umbrella-5459354-4551753.png',
  'https://github.com/jaysuno0',
  '',
];
const TITLE_IMAGE =
  'https://cdni.iconscout.com/illustration/premium/thumb/man-walking-in-rain-while-using-smartphone-4981190-4150835.png';
const StartScreen = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <div>
          <h1>Welcome to Umbrella</h1>
          <p>
            Umbrella is the visual work management tool that empowers teams to ideate, plan, manage,
            and celebrate their work together in a collaborative, productive, and organized way.
            Whether you and your team are starting something new or trying to get more organized
            with your existing work, Umbrella adapts to any project. It helps you simplify and
            standardize your team’s work process intuitively. But don’t let its simplicity fool you!
            Umbrella is user-friendly, yet still able to handle your team’s most robust projects.
            This is a quick overview of what you need to know when you are just starting your first
            Umbrella project.
          </p>
        </div>
        <div className={classes.title__image}>
          <img src={TITLE_IMAGE} alt="start-screen image" />
        </div>
      </div>
      <div className={classes.about}>
        <div>
          <h3>About Project </h3>
          <p>
            This application is the result of the final task , students of the{' '}
            <a href="https://rs.school/react/">Reactor Development course</a>
          </p>
          <p>
            <a href="https://rs.school/index.html">RS School</a> is free-of-charge and
            community-based education program conducted by The Rolling Scopes developer community
            since 2013. Everyone can study at RS School, regardless of age, professional employment,
            or place of residence. The mentors and trainers of our school are front-end and
            javascript developers from different companies and countries.
          </p>
        </div>
        <div className={classes.about__image}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/happy-schoolgirl-walk-under-umbrella-at-rainy-season-5683488-4736231.png"
            alt="about-image"
          />
        </div>
      </div>
      <div className={classes.team__wrapper}>
        <div className={classes.team__title}>
          <h2>Our Team</h2>
        </div>
        <div className={classes.team}>
          <div className={classes.tmate}>
            <div className={classes.tmate__info}>
              <div className={classes.tmate__name}>
                <h3>{TMATE3[0]}</h3>
              </div>
              <div className={classes.tmate__link}>
                <a href={TMATE3[2]} target="blank">
                  <Button icon={<GithubFilled />} size={'large'} type={'link'}></Button>
                </a>
                <a href={TMATE3[3]} target="blank">
                  <Button icon={<LinkedinFilled />} size={'large'} type={'link'}></Button>
                </a>
              </div>
            </div>
            <div className={classes.tmate__image}>
              <img src={TMATE3[1]} alt="tmate" />
            </div>
          </div>
          <div className={classes.tmate}>
            <div className={classes.tmate__info}>
              <div className={classes.tmate__name}>
                <h3>{TMATE2[0]}</h3>
              </div>
              <div className={classes.tmate__link}>
                <a href={TMATE2[2]} target="blank">
                  <Button icon={<GithubFilled />} size={'large'} type={'link'}></Button>
                </a>
                <a href={TMATE2[3]} target="blank">
                  <Button icon={<LinkedinFilled />} size={'large'} type={'link'}></Button>
                </a>
              </div>
            </div>
            <div className={classes.tmate__image}>
              <img src={TMATE2[1]} alt="tmate" />
            </div>
          </div>
          <div className={classes.tmate}>
            <div className={classes.tmate__info}>
              <div className={classes.tmate__name}>
                <h3>{TMATE1[0]}</h3>
              </div>
              <div className={classes.tmate__link}>
                <a href={TMATE1[2]} target="blank">
                  <Button icon={<GithubFilled />} size={'large'} type={'link'}></Button>
                </a>
                <a href={TMATE1[3]} target="blank">
                  <Button icon={<LinkedinFilled />} size={'large'} type={'link'}></Button>
                </a>
              </div>
            </div>
            <div className={classes.tmate__image}>
              <img src={TMATE1[1]} alt="tmate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
