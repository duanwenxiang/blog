import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import babyIco from "@/assets/img/baby.ico";
import GitHubIcon from "@/assets/img/github.png";
import EmailIcon from "@/assets/img/email.png";
import WechatIcon from "@/assets/img/wechat.png";

function Copyright() {
  const time = new Date().toISOString().split("T")[0].split("-");
  console.log(time);
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}前端切图仔
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {time[0]}年{time[1]}月{time[2]}日
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: 'url("http://api.btstu.cn/sjbz/?lx=fengjing")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: theme.spacing(16, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <img src={babyIco} alt="baby" className="home_toolbar_img" />
          <Typography variant="h6" color="inherit" noWrap>
            前端切图仔
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              💪努力撸码中
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textPrimary"
              paragraph
            >
              记录学习，分享知识
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<img src={GitHubIcon} alt="" height={20} />}
                  >
                    GitHub
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<img src={WechatIcon} alt="" height={20} />}
                  >
                    微信
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<img src={EmailIcon} alt="" height={20} />}
                  >
                    邮箱
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="http://api.btstu.cn/sjbz/"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
