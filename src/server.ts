import config from './app/config';
import app from './app';

import mongoose from 'mongoose';

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    app.listen(config.port, () => {
      console.log(`app is runing on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
