export type Event = {
  eventId?: number;
  eventTitle?: string;
  eventDescription?: string;
  eventImage?: string;
  eventDate?: string;
  eventStatus?: string;
  createdDate?: string;
  projectId?: number;
  projectTitle?: string;
  userId?: number;
  username?: string;
};

export type EventProps = {
  event: Event;
};

export type EventPost = {
  eventId?: number;
  eventTitle?: string;
  eventImage?: string;
  postId?: number;
  postTitle?: string;
  postImage?: string;
  projectId?: number;
  projectTitle?: string;
  userId?: number;
  username?: string;
};