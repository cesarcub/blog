import React from 'react';
import { NavLink } from 'react-router-dom';

import '../index.css';

const Home = () => {
    return (
        <>
            <div className="hero-container d-flex flex-wrap align-items-center justify-content-center">
                <div className="text-hero">
                    <h1 className="text-center">
                        <span role="img" aria-label="Ícono blog">🚀</span><br />
                        Bloggito
                    </h1>
                    <h2 className="text-center">Donde compartes tus ideas</h2>
                </div>
            </div>
            <section className="descripcion-blog container py-5">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="text-center py-3">
                                <span class="fa-stack fa-5x">
                                    <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                    <i class="fas fa-pen-nib fa-stack-1x fa-inverse"></i>
                                </span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Crea</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa eos impedit inventore molestias quam ea adipisci voluptate sint totam quasi quae laudantium cupiditate soluta nam, molestiae corporis vitae? Debitis!</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="text-center py-3">
                                <span class="fa-stack fa-5x">
                                    <i class="fas fa-circle fa-stack-2x text-warning"></i>
                                    <i class="fas fa-book-reader fa-stack-1x fa-inverse"></i>
                                </span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Disfruta</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa eos impedit inventore molestias quam ea adipisci voluptate sint totam quasi quae laudantium cupiditate soluta nam, molestiae corporis vitae? Debitis!</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="text-center py-3">
                                <span class="fa-stack fa-5x">
                                    <i class="fas fa-circle fa-stack-2x text-success"></i>
                                    <i class="fas fa-users fa-stack-1x fa-inverse"></i>
                                </span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Conéctate</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa eos impedit inventore molestias quam ea adipisci voluptate sint totam quasi quae laudantium cupiditate soluta nam, molestiae corporis vitae? Debitis!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;