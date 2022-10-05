import React from "react";
import { useState } from "react";

export default function MintEvent() {
  const [eventName, setEventName] = useState();
  const [eventDescription, setDescription] = useState();
  const [eventLocation, setLocation] = useState();
  const [eventDate, setDate] = useState();
  const [eventSocialLink, setSocialLink] = useState();
  const [eventAdmin, setAdmin] = useState();
  const [ipfsUrl, setIpfsUrl] = useState();

  return <div className="flex w-full justify-center"></div>;
}
