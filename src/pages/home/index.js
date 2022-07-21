import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import babyIco from "@/assets/img/baby.ico";
import GitHubIcon from "@/assets/img/github.png";
import WechatIcon from "@/assets/img/wechat.png";
import mdList from "@/markdown";

function Copyright() {
  const time = new Date().toISOString().split("T")[0].split("-");
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
    cursor: "pointer",
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

export default function Home(props) {
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
                    onClick={() => {
                      window.open("https://github.com/duanwenxiang");
                    }}
                  >
                    GitHub
                  </Button>
                </Grid>
                <Grid item>
                  <Tooltip
                    title={
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <img
                        style={{ width: "200px" }}
                        src="https://i.niupic.com/images/2022/07/21/a16H.jpeg"
                      ></img>
                    }
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<img src={WechatIcon} alt="" height={20} />}
                    >
                      微信
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {Object.keys(mdList).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  className={classes.card}
                  onClick={() => {
                    props.history.push({
                      pathname: "text/" + mdList[card].title,
                    });
                  }}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={mdList[card].img}
                    title={mdList[card].title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {mdList[card].title}
                    </Typography>
                    <Typography>{mdList[card].info}</Typography>
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
