import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={props.style} className={classes.root} >
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography className={classes.heading}>Tecnologia</Typography>
          <Typography className={classes.secondaryHeading}>●	Tweeze? O que é? De onde é? Para que serve?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          A Tweeze é uma startup 100% brasileira. Possuímos uma base presencial em Brasília, no Setor Comercial Sul, mas nos vemos como uma empresa sem fronteiras! Naturalmente nossa primeira notícia captada foi do Brasil, mas hoje já somos líderes no monitoramento de dados no Brasil! O nosso espírito é de crescimento! 
          <br></br>
          “Para a Tweeze existem dois pilares - cliente e tecnologia” - Cristiano da Matta (co-fundador da Tweeze). 
          <br></br>
          Aos nossos clientes, contem com a gente como parceiros estratégicos. Nosso compromisso é crescer sem encarecer! Oferecer suporte! Hoje nossa solução, ainda em fase de entrada no mercado, conhecida como Beta. Nesse momento já oferecemos o serviço de clipping jornalístico, em média 70% mais barato que outras soluções de mercado. Economia para você é sinal de alavancagem para a gente.  
          <br></br>
          Somos apaixonados por tecnologia. Dentro das nossas soluções, estão funcionalidades extremamente interessantes. Inteligência artificial, processamento de linguagem natural, redes neurais, aprendizado profundo (deep learning) - tudo que parece complicado, para garantir a você em tempo real, o que realmente importa para a sua organização – dados, notícias e métricas a respeito do que falam sobre sua marca em tempo real. 
          <br></br>
          Vamos pinçar?
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Tecnologia</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como chegam as informações a respeito da minha marca?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Atualmente, vivenciamos a versão Beta - fase de pré-lançamento do serviço. Nela, a Tweeze capta e analisa dados de milhares de sites jornalísticos no Brasil e no mundo, além do Twitter, onde todas as informações chegam em 1º lugar.
          <br></br><br></br>
          A Tweeze intercorre aproximadamente 40 mil notícias por dia e milhões de outros dados em mídias sociais. Somente, no último mês (abril 2021), nossa inteligência artificial - Jull.IA, analisou meio milhão de notícias, classificando-as como positivas ou negativas. 
          <br></br><br></br>
          Imagine, essa funcionalidade para você, sua marca, sua pesquisa científica, seu tema de interesse, o que você imaginar! Nós teremos as notícias e informações mais atualizadas. Se é importante para você, é importante para a gente. 
          <br></br><br></br>
          Vamos Pinçar?
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Tecnologia</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Centenas dos principais sites de notícias do mundo são pinçados a cada 5 segundos pelo nosso sistema. A Tweeze possui milhares de fontes espalhadas no Brasil e no mundo. 
          Mesmo assim, converse com um de nossos consultores de vendas e confirme se o seu veículo favorito já está sendo pinçado. 
          <br></br><br></br>
          <strong>Diferenciais Tweeze</strong>
          Possuímos uma equipe permanente de inclusão de novos veículos jornalísticos. Caso uma fonte específica seja importante para você não esteja incluída no sistema, adicionamos para você!
          <br></br><br></br>
          Se é importante para você é importante para Tweeze - Vamos Pinçar?
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Financeiro</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          ●	Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem burocracia e sem cartão de crédito.. Crie uma conta, acesse o sistema, cadastre as palavras ou termos importantes para você. Na sequência, você já terá acesso às notícias mais recentes a respeito do que você deseja.

          Possuímos um plano gratuito que lhe dará direito a pesquisas sobre o seu tema de interesse. Por mais que as buscas sejam buscam ilimitadas, você não poderá exportar o relatório das suas notícias favoritas e também não as receberá por e-mail. 
          
          No plano trial você terá acesso equivalente ao plano Padrão, que possui recursos, como: acesso a 5 grupos de palavras chaves, relatório de clipping, envio do clipping automatizado para e-mail de escolha. 
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Financeiro</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          ●	Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem burocracia e sem cartão de crédito.. Crie uma conta, acesse o sistema, cadastre as palavras ou termos importantes para você. Na sequência, você já terá acesso às notícias mais recentes a respeito do que você deseja.

          Possuímos um plano gratuito que lhe dará direito a pesquisas sobre o seu tema de interesse. Por mais que as buscas sejam buscam ilimitadas, você não poderá exportar o relatório das suas notícias favoritas e também não as receberá por e-mail. 
          
          No plano trial você terá acesso equivalente ao plano Padrão, que possui recursos, como: acesso a 5 grupos de palavras chaves, relatório de clipping, envio do clipping automatizado para e-mail de escolha. 
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Financeiro</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          ●	Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem burocracia e sem cartão de crédito.. Crie uma conta, acesse o sistema, cadastre as palavras ou termos importantes para você. Na sequência, você já terá acesso às notícias mais recentes a respeito do que você deseja.

          Possuímos um plano gratuito que lhe dará direito a pesquisas sobre o seu tema de interesse. Por mais que as buscas sejam buscam ilimitadas, você não poderá exportar o relatório das suas notícias favoritas e também não as receberá por e-mail. 
          
          No plano trial você terá acesso equivalente ao plano Padrão, que possui recursos, como: acesso a 5 grupos de palavras chaves, relatório de clipping, envio do clipping automatizado para e-mail de escolha. 
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Financeiro</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          ●	Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem burocracia e sem cartão de crédito.. Crie uma conta, acesse o sistema, cadastre as palavras ou termos importantes para você. Na sequência, você já terá acesso às notícias mais recentes a respeito do que você deseja.

          Possuímos um plano gratuito que lhe dará direito a pesquisas sobre o seu tema de interesse. Por mais que as buscas sejam buscam ilimitadas, você não poderá exportar o relatório das suas notícias favoritas e também não as receberá por e-mail. 
          
          No plano trial você terá acesso equivalente ao plano Padrão, que possui recursos, como: acesso a 5 grupos de palavras chaves, relatório de clipping, envio do clipping automatizado para e-mail de escolha. 
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Financeiro</Typography>
          <Typography className={classes.secondaryHeading}>
          ●	Como sei se o meu site favorito está sendo pinçado?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          ●	Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem burocracia e sem cartão de crédito.. Crie uma conta, acesse o sistema, cadastre as palavras ou termos importantes para você. Na sequência, você já terá acesso às notícias mais recentes a respeito do que você deseja.

          Possuímos um plano gratuito que lhe dará direito a pesquisas sobre o seu tema de interesse. Por mais que as buscas sejam buscam ilimitadas, você não poderá exportar o relatório das suas notícias favoritas e também não as receberá por e-mail. 
          
          No plano trial você terá acesso equivalente ao plano Padrão, que possui recursos, como: acesso a 5 grupos de palavras chaves, relatório de clipping, envio do clipping automatizado para e-mail de escolha. 
          
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
