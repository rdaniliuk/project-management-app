import React from 'react';
import classes from './Footer.module.css';
import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <a href="https://rs.school/react/" target="blank">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs-logo" />
      </a>
      <div className={classes.link}>
        <a href="https://github.com/jaysuno0" target="blank">
          <Button icon={<GithubOutlined />} size={'small'} type={'link'}>
            Daniil
          </Button>
        </a>
        <a href="https://github.com/Alexander-M-rss" target="blank">
          <Button icon={<GithubOutlined />} size={'small'} type={'link'}>
            Oleksandr
          </Button>
        </a>
        <a href="https://github.com/rdaniliuk" target="blank">
          <Button icon={<GithubOutlined />} size={'small'} type={'link'}>
            Roman
          </Button>
        </a>
      </div>
      <span>©2022</span>
    </div>
  );
};

export default Footer;
