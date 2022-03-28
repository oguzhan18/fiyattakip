export class RssFile {
  rss: RSS;
}

export class RSS {
  $: any;
  channel: Channel[];
}

export class Channel {
  item: Item[];
  link: any;
  title: any;
}

export class Item {
  title: string;
  author: string;
  link: string;
  pubDate: string;
}
