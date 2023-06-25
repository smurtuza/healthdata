import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    // Connect to the MQTT broker
    this.client = mqtt.connect('mqtt://15.207.62.22:1884');

    // Handle connection events
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('MQTT Error:', error);
    });
  }

  async publish(topic: string, message: string): Promise<void> {
    // Publish a message to the specified topic
    this.client.publish(topic, message);
  }

  async disconnect(): Promise<void> {
    // Disconnect from the MQTT broker
    this.client.end();
  }
}
