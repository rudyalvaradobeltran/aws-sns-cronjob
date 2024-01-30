import * as cdk from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';

export class AwsSnsCronjobStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const rule = new Rule(this, 'rule', {
      schedule: Schedule.expression('cron(30 18 * * MON-FRI *)')
    });

    const topic = new Topic(this, 'topic', {
      displayName: 'My Topic'
    });

    topic.addSubscription(new EmailSubscription('email'));

    rule.addTarget(new SnsTopic(topic));
  }
}
