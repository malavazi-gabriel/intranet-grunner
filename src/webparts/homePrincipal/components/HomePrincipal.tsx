import * as React from 'react';
import { IHomePrincipalProps } from './IHomePrincipalProps';
import styles from './HomePrincipal.module.scss';
import logoGrunner from '../assets/logo-grunner.png';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

interface IHomePrincipalState { 
  menuAberto: boolean; 
  noticiasReais: any[]; 
  aniversariantesReais: any[]; 
  eventosReais: any[]; // Nossa terceira e última lista!
}

export default class HomePrincipal extends React.Component<IHomePrincipalProps, IHomePrincipalState> {
  private menuRef: React.RefObject<HTMLElement>;

  constructor(props: IHomePrincipalProps) {
    super(props);
    this.state = { 
      menuAberto: false,
      noticiasReais: [],
      aniversariantesReais: [],
      eventosReais: [] // Começa vazio
    };
    this.menuRef = React.createRef();
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    // Dispara as 3 buscas ao mesmo tempo!
    this.buscarNoticias(); 
    this.buscarAniversariantes(); 
    this.buscarEventos(); 
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // === 1. NOTÍCIAS (MARKETING) ===
  private buscarNoticias = async () => {
    try {
      const url = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('NoticiasGrunner')/items?$select=Title,Resumo,ImagemURL,LinkNoticia&$top=5&$orderby=Created desc`;
      const response: SPHttpClientResponse = await this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      const data = await response.json();
      if (data && data.value) this.setState({ noticiasReais: data.value });
    } catch (error) { console.error("Erro ao buscar notícias:", error); }
  }

  // === 2. ANIVERSARIANTES (RH) ===
  private buscarAniversariantes = async () => {
    try {
      const url = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('AniversariantesGrunner')/items?$select=Title,Dia,Setor,Email&$top=4`;
      const response: SPHttpClientResponse = await this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      const data = await response.json();
      if (data && data.value) this.setState({ aniversariantesReais: data.value });
    } catch (error) { console.error("Erro ao buscar aniversariantes:", error); }
  }

  // === 3. EVENTOS (COMUNICAÇÃO) ===
  private buscarEventos = async () => {
    try {
      const url = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('EventosGrunner')/items?$select=Title,Dia,Mes,Local&$top=3&$orderby=Created desc`;
      const response: SPHttpClientResponse = await this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      const data = await response.json();
      if (data && data.value) this.setState({ eventosReais: data.value });
    } catch (error) { console.error("Erro ao buscar eventos:", error); }
  }

  private handleClickOutside = (event: MouseEvent) => {
    if (this.state.menuAberto && this.menuRef.current && !this.menuRef.current.contains(event.target as Node)) {
      this.setState({ menuAberto: false });
    }
  };

  private toggleMenu = () => { this.setState((prevState) => ({ menuAberto: !prevState.menuAberto })); };

  public render(): React.ReactElement<IHomePrincipalProps> {
    
    const noticiaDestaque = this.state.noticiasReais.length > 0 ? this.state.noticiasReais[0] : null;
    const outrasNoticias = this.state.noticiasReais.length > 1 ? this.state.noticiasReais.slice(1) : [];

    return (
      <section className={styles.homePrincipal}>
        
        <div className={styles.headerContainer}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <img src={logoGrunner} alt="Grunner" style={{ height: '60px', objectFit: 'contain' }} />
            <div>
              <h1 className={styles.greetingTitle}>Bem-vindo ao Portal, {this.props.userDisplayName?.split(' ')[0]}.</h1>
              <p className={styles.greetingSub}>O centro nervoso da nossa operação agro e tecnológica.</p>
            </div>
          </div>

          <nav className={styles.topNav} ref={this.menuRef}>
            <a href="#" className={styles.topMenuLink}>🎫 Chamados (TI)</a>
            <a href="#" className={styles.topMenuLink}>📊 Dashboards Zabbix</a>
            <button onClick={this.toggleMenu} className={`${styles.topMenuLink} ${styles.megaMenuBtn} ${this.state.menuAberto ? styles.active : ''}`}>
              🗂️ Ecossistema Grunner {this.state.menuAberto ? '▲' : '▼'}
            </button>
            
            {this.state.menuAberto && (
              <div className={styles.megaMenu}>
                <div>
                  <h4 className={styles.megaMenuCategory}>Infraestrutura IT</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="#" className={styles.dropdownLink}>Microsoft 365 Admin</a>
                    <a href="#" className={styles.dropdownLink}>Gestão de Ativos</a>
                    <a href="#" className={styles.dropdownLink}>Zabbix e Grafana</a>
                  </div>
                </div>
                <div>
                  <h4 className={styles.megaMenuCategory}>Gente e Gestão</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="#" className={styles.dropdownLink}>Portal RH</a>
                    <a href="#" className={styles.dropdownLink}>Código de Conduta</a>
                    <a href="#" className={styles.dropdownLink}>Comunicados Oficiais</a>
                  </div>
                </div>
                <div>
                  <h4 className={styles.megaMenuCategory}>Operacional</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="#" className={styles.dropdownLink}>Sistema de Logística</a>
                    <a href="#" className={styles.dropdownLink}>Telemetria de Máquinas</a>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>

        {noticiaDestaque && (
          <div className={styles.heroBanner} onClick={() => window.open(noticiaDestaque.LinkNoticia || '#', '_blank')} style={{ cursor: 'pointer' }}>
            <div className={styles.heroBg} style={{ backgroundImage: `url(${noticiaDestaque.ImagemURL})` }} />
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <span className={styles.badge}>Destaque Operacional</span>
              <h2 style={{ margin: '15px 0 10px 0', fontSize: '36px', color: '#ffffff', fontWeight: 800, lineHeight: '1.1', maxWidth: '800px' }}>{noticiaDestaque.Title}</h2>
              <p style={{ margin: '0 0 25px 0', color: '#D1D5DB', fontSize: '16px', maxWidth: '650px', lineHeight: '1.5' }}>{noticiaDestaque.Resumo}</p>
              <button className={styles.primaryBtn}>Ler Comunicado Completo</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className={styles.sectionTitle}>Grunner em Ação</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              
              {outrasNoticias.length > 0 ? (
                outrasNoticias.map((noticia, i) => (
                  <article key={i} className={styles.newsCard} onClick={() => window.open(noticia.LinkNoticia || '#', '_blank')}>
                    <div style={{ width: '100%', height: '220px', backgroundImage: `url(${noticia.ImagemURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div style={{ padding: '20px' }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#1C2510', fontWeight: 800, lineHeight: '1.3' }}>{noticia.Title}</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>{noticia.Resumo}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ color: '#6B7280' }}>Não há comunicados recentes para exibir.</p>
              )}

            </div>
          </div>

          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* WIDGET DE EVENTOS DINÂMICO */}
            <div className={styles.widgetCard}>
              <h3 className={styles.sectionTitle}>Radar Corporativo</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {this.state.eventosReais.length > 0 ? (
                  this.state.eventosReais.map((evento, i) => (
                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div className={styles.calendarDateBlock}>
                        <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: '1' }}>{evento.Dia}</span>
                        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>{evento.Mes}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#1C2510' }}>{evento.Title}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>📍 {evento.Local}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#6B7280', fontSize: '14px' }}>Nenhum evento agendado.</p>
                )}

              </div>
            </div>

            <div className={styles.widgetCard}>
              <h3 className={styles.sectionTitle}>Nossa Equipe</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {this.state.aniversariantesReais.length > 0 ? (
                  this.state.aniversariantesReais.map((niver, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {niver.Email ? (
                        <img 
                          src={`${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?size=M&accountname=${niver.Email}`} 
                          alt={niver.Title} 
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #A6CE39' }} 
                        />
                      ) : (
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#F1F9E6', color: '#5E7D14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid #A6CE39' }}>🎉</div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#1C2510' }}>{niver.Title}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>{niver.Setor} • Dia {niver.Dia}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#6B7280', fontSize: '14px' }}>Nenhum aniversariante encontrado.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}