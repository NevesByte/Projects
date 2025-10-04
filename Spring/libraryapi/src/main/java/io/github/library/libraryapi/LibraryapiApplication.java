package io.github.library.libraryapi;

import io.github.library.libraryapi.model.Autor;
import io.github.library.libraryapi.repository.AutorRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibraryapiApplication {

	public static void main(String[] args) {
       var sa = SpringApplication.run(LibraryapiApplication.class, args);
       var repository = sa.getBean(AutorRepository.class);
       add(repository);
	}

    public static void add(AutorRepository repository) {
        Autor autor = new Autor();
        autor.setEmail("victorneves596@gmail.com");
        autor.setNome("Victor");

        var entidade = repository.save(autor);
        System.out.println(entidade);
    }

}
