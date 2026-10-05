const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const teamsRouter = require('./routes/teams');
const projectsRouter = require('./routes/projects');
const evaluationsRouter = require('./routes/evaluations');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/teams', teamsRouter);
app.use('/projects', projectsRouter);
app.use('/evaluations', evaluationsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
