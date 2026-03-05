import * as React from 'react';
import { IHomePrincipalProps } from './IHomePrincipalProps';

// 1. IMPORTANTE: Importar os estilos para usar o 'styles.buttonBase'
import styles from './HomePrincipal.module.scss';

// 2. Importação do logo (usando o nome que você renomeou)
import logoGrunner from '../assets/logo-grunner.png';

const ANIVERSARIANTES = [
  { nome: 'Gabriel Malavazi', dia: '15', setor: 'TI' },
  { nome: 'Júlia Silva', dia: '20', setor: 'RH' },
  { nome: 'Marcos Oliveira', dia: '22', setor: 'Logística' },
];

export default class HomePrincipal extends React.Component<IHomePrincipalProps, {}> {
  public render(): React.ReactElement<IHomePrincipalProps> {
    return (
      <section style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: 'Segoe UI', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <header style={{ 
          backgroundColor: '#ffffff', 
          padding: '0 40px', 
          height: '70px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          zIndex: 10
        }}>
          <img src={logoGrunner} alt="Grunner" style={{ height: '45px' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, color: '#1A1C1E' }}>{this.props.userDisplayName}</div>
            <div style={{ fontSize: '11px', color: '#70777E' }}>ANALISTA DE TI</div>
          </div>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          
          {/* SIDEBAR */}
          <nav style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #E9ECEF', padding: '30px 0' }}>
            <div style={{ padding: '0 25px 15px', color: '#ADB5BD', fontSize: '11px', fontWeight: 700 }}>MENU PRINCIPAL</div>
            <a href="#" style={{ padding: '12px 25px', display: 'block', textDecoration: 'none', color: '#A6CE39', backgroundColor: '#F1F9E6', borderLeft: '4px solid #A6CE39', fontWeight: 600 }}>📊 Dashboard de Redes</a>
            <a href="#" style={{ padding: '12px 25px', display: 'block', textDecoration: 'none', color: '#495057' }}>🛡️ Segurança</a>
          </nav>

          {/* CONTEÚDO */}
          <main style={{ flex: 1, padding: '40px' }}>
            <h1 style={{ fontSize: '24px', color: '#1A1C1E', marginBottom: '30px' }}>Bem-vindo ao Portal Grunner</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
              
              {/* CARD COM O BOTÃO INTERATIVO */}
              <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #F1F3F5', display: 'flex', flexDirection: 'column' }}>
                 <span style={{ backgroundColor: '#EBF5D6', color: '#5E7D14', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, width: 'fit-content', marginBottom: '15px' }}>TI & INFRA</span>
                 <h3 style={{ margin: '0 0 10px 0' }}>Monitoramento em Tempo Real</h3>
                 <p style={{ fontSize: '14px', color: '#70777E', marginBottom: '20px', flex: 1 }}>Status operacional dos servidores e dashboards do Grafana.</p>
                 
                 {/* O BOTÃO QUE VOCÊ COPIOU VAI AQUI DENTRO */}
                 <button className={styles.buttonBase}>Acessar Monitoramento</button>
              </div>

              {/* CARD ANIVERSARIANTES */}
              <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #F1F3F5' }}>
                 <span style={{ backgroundColor: '#FFF4D6', color: '#946C00', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, width: 'fit-content', marginBottom: '15px' }}>CELEBRAÇÃO</span>
                 <h3 style={{ margin: '0 0 10px 0' }}>Aniversariantes do Mês</h3>
                 <div style={{ marginTop: '15px' }}>
                   {ANIVERSARIANTES.map((niver, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F1F3F5' : 'none' }}>
                       <span style={{ fontSize: '14px', color: '#495057' }}>{niver.nome}</span>
                       <span style={{ fontSize: '12px', fontWeight: 600, color: '#ADB5BD' }}>{niver.dia} MAR</span>
                     </div>
                   ))}
                 </div>
              </div>

            </div>
          </main>
        </div>
      </section>
    );
  }
}