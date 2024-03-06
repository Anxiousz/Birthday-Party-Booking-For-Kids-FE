import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardLink,
  CardHeader,
  CardFooter,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from "reactstrap";
import "../styles/about.css";
import aoi from "../assets/images/aoi.jpg";
import kunado from "../assets/images/kunado.jpg";
import hapymaher from "../assets/images/hapymaher.jpg";

function About(props) {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <UncontrolledAccordion
        defaultOpen={["1", "2"]}
        stayOpen
      >
      
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">History</AccordionHeader>
          <img src={aoi} alt="" className="img_card_drop" /> <br />
          November, the start of winter. Kirihara Academy for Girls, a
          missionary boarding school located in the remote Japanese mountains.
          It's here we find our protagonist, Shiratori Ritsu, the sole male
          allowed on campus and the school priest. He has the power to bring
          bliss to those he touches, and that ability is enhanced if the contact
          is sexual in nature. Never once has he set foot outside the academy
          grounds, which protect him from demons lusting after him. But the
          girls of this academy come to him, believing he's their guardian
          angel, and he obliges. For he is burdened by the death of a girl,
          which strengthened his resolve to make others happy. This constant mix
          of the holy and the sinful has him just barely holding onto his
          sanity. And the sudden arrival of a new girl raises the curtain on a
          whole new story. For she is the one hundred year old vampire, Mary
          Harker. However, her infiltration of the academy brings with it
          another surprise... Namely, a phone call from the devil. Can these
          powers of his truly bring joy to people's hearts? For what reason was
          he born? This is a tale of life, woven into prayer.
          <AccordionBody accordionId="1"></AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Traditional</AccordionHeader>
          <AccordionBody accordionId="2">
            <img src={kunado} alt="" className="img_card_drop" /> <br />
            One day, metals have gained a will and randomly began to attack
            humanity all over the world――― Without knowing the cause, all the
            civilization and history on the earth were destroyed, and mankind
            has been hit by unprecedented catastrophes for about 1,000 years.
            Humans drastically reduced their numbers and managed to survive
            while resisting the attack against the metal with will Tekki. Many
            of the remaining humans have awakened to their supernatural powers,
            and devoted themselves to the days of battle. Meanwhile, a girl
            named Natsuhime, one of the warriors belonging to the frontier
            country of Kanto, defeats Kurokami, the greatest threat of Tetsuoni.
            The people of Kanto who survived are shaken and rejoices the
            disappearance of a thousand-year-old threat to human existence. This
            story revolves around the boy Shin, who has no memory of being found
            in the remains of Kurokami after the battle. It is a story of
            mankind's revival and how it reconstructs history from the former
            civilization that humans lost to Kurokami.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">The Ideal</AccordionHeader>
          <AccordionBody accordionId="3">
            <img src={hapymaher} alt="" className="img_card_drop" /> <br />
            Lucid dreams. Dreams where you know that you're dreaming. After an
            accident in his youth, Tooru Naitou began to have nothing but lucid
            dreams. Always being aware of when he's dreaming meant that his mind
            could no longer rest when he was asleep. Only when he collapsed from
            utter exhaustion does he finally get a reprieve. Lucky for him, he
            has a childhood friend, Saki, who insists on calling him 'Nii-san'
            that tries to do what she can to support him. In his science club,
            his senpai Yayoi is endlessly amused by his awkward way of living.
            And he has an underclassman, Keiko, who likes to sing in front of
            the station and likes to call him weird for his less than normal
            attitude towards life. Tonight, Tooru dreams again. But this dream
            is different from those that came before. "Maia...? Why are you in
            my dream...?" A girl he hasn't seen ever since he started having
            lucid dreams, and to Tooru, this was the very worst form she could
            take. But Maia wasn't the only one who appeared. "I'll put an end to
            bad dreams right here." With those words, a girl who calls herself
            Alice rescues Tooru from Maia's grasps. Alice says that she's a
            traveler of dreams, and now she's come to Tooru's dream. What could
            all this mean? The anxious Tooru certainly has no answers as Maia
            softly whispers into his ear: “This is the story of a sweet, happy
            nightmare.”
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      </UncontrolledAccordion>
    </div>
  );
}
export default About;
