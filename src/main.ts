import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as os from "os";
import { CustomLogger } from "./logger/custom.logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const PORT = process.env.PORT || 4000;
  const address = getLocalIp();
  await app.listen(PORT, address);
  console.log("Running on: " + address + ":" + PORT);
}
bootstrap();

export const getLocalIp = (): string => {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];

    if (addresses) {
      for (const addressInfo of addresses) {
        if (addressInfo.family === "IPv4" && !addressInfo.internal) {
          return addressInfo.address;
        }
      }
    }
  }
  return "172.0.0.1";
};
