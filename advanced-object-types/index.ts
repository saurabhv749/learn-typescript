// https://www.codecademy.com/courses/learn-typescript/projects/self-driving-car

import { getObstacleEvents } from "./computer-vision";

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}

interface Events {
  [obstaclePosition: string]: boolean;
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class SteeringControl implements Steering {
  execute(command: string) {
    console.log("Executing:", command);
  }
  turn(direction: string) {
    this.execute(`turn ${direction}`);
  }
}

class Car implements AutonomousCar {
  isRunning;
  steeringControl;

  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }
  respond(events: Events) {
    if (!this.isRunning) {
      return console.log("Car is off.");
    }

    Object.keys(events).forEach((eventKey) => {
      if (events[eventKey] === false) {
        return;
      }

      const obstaclePosition = eventKey === "ObstacleLeft" ? "Left" : "Right";
      console.log(`Obstacle on ${obstaclePosition}`);

      if (eventKey === "ObstacleLeft") this.steeringControl.turn("right");
      else if (eventKey === "ObstacleRight") this.steeringControl.turn("left");
    });
  }
}

const steering = new SteeringControl();
const autonomousCar = new Car({ isRunning: true, steeringControl: steering });

// Test
const obstacles: Events[] = [];
for (let i = 0; i < 5; i++) {
  obstacles.push(getObstacleEvents());
}
obstacles.forEach((obstacle) => {
  autonomousCar.respond(obstacle);
});
