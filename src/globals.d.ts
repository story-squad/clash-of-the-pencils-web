declare module '*.md';
declare module '*.m4a';
declare module '*.mp3';
declare module '*.wav';
declare module 'react-page-scroller';
declare module 'react-livestream' {
  import React from 'react';

  type AcceptedPlatforms = 'youtube' | 'mixer' | 'twitch';

  interface BaseProps {
    platform: AcceptedPlatforms;
    offlineComponent?: React.ReactNode;
  }

  interface YoutubePlayerProps extends BaseProps {
    platform: 'youtube';
    youtubeApiKey: string;
    youtubeChannelId: string;
  }

  interface TwitchPlayerProps extends BaseProps {
    platform: 'twitch';
    twitchDataUrl: string;
    twitchUserName: string;
  }

  type LivestreamComponentProps = YoutubePlayerProps | TwitchPlayerProps;

  export default class ReactLivestream extends React.Component<LivestreamComponentProps> {}
}
