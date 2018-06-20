export enum RequestTypes {
  Launch = 'LaunchRequest',
  Intent = 'IntentRequest',
  SessionEnded = 'SessionEndedRequest'
}

export enum IntentTypes {
  Help = 'AMAZON.HelpIntent',
  Stop = 'AMAZON.StopIntent',
  Cancel = 'AMAZON.CancelIntent',
  Fallback = 'AMAZON.FallbackIntent',
  TopSpeakers = 'TopSpeakers',
  UpcomingEvents = 'UpcomingEvents',
  About = 'AboutIntent',
  ArtistTopTrack = 'ArtistTopTrackIntent'
}
