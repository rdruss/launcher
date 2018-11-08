import { del } from '.';

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Missing argument');
    console.log(`Usage: yarn run -s delete <project_dir>`);
    console.log(`    project_dir     - The project directory.`);
    process.exit(1);
}

const TARGET_DIR = args[0];

del(TARGET_DIR).catch(err => console.error(`Delete Error: ${err}`));
