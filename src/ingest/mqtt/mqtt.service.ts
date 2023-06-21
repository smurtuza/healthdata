// mqtt.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private mqttClient: mqtt.Client;

  constructor() {
    const brokerUrl = 'mqtt://15.207.62.22:1884';
    this.mqttClient = mqtt.connect(brokerUrl);

    this.mqttClient.on('connect', () => {
      this.logger.log('Connected to MQTT broker');
    });

    this.mqttClient.on('error', (error) => {
      this.logger.error(`MQTT error: ${error}`);
    });
  }

  async publish(topic: string, message: any): Promise<void> {
    this.mqttClient.publish(topic, JSON.stringify(message));
  }
}
