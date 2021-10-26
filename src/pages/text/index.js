import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import babyIco from "@/assets/img/baby.ico";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  body: {
    padding: theme.spacing(4),
  },
  footer: {
    borderTop: "solid 1px #ccc",
    padding: theme.spacing(6),
  },
}));

const Text = (props) => {
  const classes = useStyles();
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(mdList[props.match.params.id].data)
      .then((x) => x.text())
      .then((res) => {
        setData(res);
      });
  }, [props.match.params.id]);

  return (
    Object.keys(mdList).length > 0 && (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <img src={babyIco} alt="baby" className="home_toolbar_img" />
            <Typography variant="h6" color="inherit" noWrap>
              前端切图仔
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="body1" className={classes.body}>
          <ReactMarkdown
            className='react_markdown'
            children={data}
            skipHtml={true}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </Typography>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </div>
    )
  );
};

export default Text;
