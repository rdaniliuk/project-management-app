import React from 'react';
import classes from './Footer.module.css';
import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TMATE1, TMATE2, TMATE3 } from 'teamInfo';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <a href="https://rs.school/react/" target="blank">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs-logo" />
      </a>
      <div className={classes.link}>
        <a href={TMATE3[2]} target="blank">
          <Button
            icon={<GithubOutlined />}
            size={'small'}
            type={'link'}
            style={{ color: '#ffcd32' }}
          >
            Daniil
          </Button>
        </a>
        <a href={TMATE2[2]} target="blank">
          <Button
            icon={<GithubOutlined />}
            size={'small'}
            type={'link'}
            style={{ color: '#ffcd32' }}
          >
            Oleksandr
          </Button>
        </a>
        <a href={TMATE1[2]} target="blank">
          <Button
            icon={<GithubOutlined />}
            size={'small'}
            type={'link'}
            style={{ color: '#ffcd32' }}
          >
            Roman
          </Button>
        </a>
      </div>
      <span>©2022</span>
    </div>
  );
};

export default Footer;
