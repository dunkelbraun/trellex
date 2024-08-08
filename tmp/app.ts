import * as cdk from "aws-cdk-lib";
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Nextjs } from "cdk-nextjs-standalone";
import { Construct } from "constructs";

export class NextStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);
		const nextjs = new Nextjs(this, "Nextjs", {
			nextjsPath: "./",
      environment: {
        DATABASE_URL:
          "postgres://postgres:monolayercloud@monolayer-trellex-app-stack.czekyw200bpx.eu-central-1.rds.amazonaws.com:5432/MonolayerTrellexDb",
      },
		});
		new CfnOutput(this, "CloudFrontDistributionDomain", {
			value: nextjs.distribution.distributionDomain,
		});
	}
}

const app = new cdk.App();
new NextStack(app, "monolayer-next-app-stack");
