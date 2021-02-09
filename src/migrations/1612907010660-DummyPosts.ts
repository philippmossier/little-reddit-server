/* eslint-disable */ 
import { MigrationInterface, QueryRunner } from 'typeorm';
import argon2 from 'argon2';

export class DummyPosts1612907010660 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPasswordForDummyUser = await argon2.hash('bob');

        await queryRunner.query(`
insert into "user"("username", "password", "email", "createdAt", "updatedAt", "upvotesUserId", "upvotesPostId") 
values (
        'bob', '${hashedPasswordForDummyUser}', 'bob@gmail.com', DEFAULT, DEFAULT, DEFAULT, DEFAULT
        );        
insert into post (title, text, "creatorId", "createdAt")
values (
                'Splice',
                'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
                1,
                '2020-12-04T13:09:02Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Funeral, The',
                'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
                1,
                '2020-10-27T03:59:19Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'No Small Affair',
                'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
                1,
                '2020-10-20T20:48:38Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                '3 Ninjas Knuckle Up',
                'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
                1,
                '2020-11-23T07:43:37Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'This Gun for Hire',
                'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
                1,
                '2020-05-06T08:59:11Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love and Sex under Nazi Occupation (Amour et sexe sous l''occupation) ',
                'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
                1,
                '2020-04-23T19:24:51Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Lupin the 3rd',
                'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
                1,
                '2020-03-10T08:31:53Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Scratch',
                'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-06-20T23:13:35Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                '2001 Maniacs',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
                1,
                '2020-11-07T21:29:26Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Trailer Park Boys: Don''t Legalize It',
                'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
                1,
                '2020-10-27T10:24:58Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'And Along Come Tourists (Am Ende kommen Touristen)',
                'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
                1,
                '2020-10-15T00:43:38Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Thing Called Love, The',
                'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
                1,
                '2020-03-28T04:23:43Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Star Wars: Episode IV - A New Hope',
                'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
                1,
                '2020-03-25T11:44:40Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Fire in Castilla (Tactilvision from the Moor of the Fright)',
                'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                1,
                '2020-08-06T18:48:00Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Chemical Brothers: Don''t Think, The',
                'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
                1,
                '2020-04-01T08:26:16Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love Life',
                'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-05-31T19:00:52Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Wu Tang Master (Tian shi zhuang xie)',
                'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
                1,
                '2020-11-30T07:56:44Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Liar''s Dice',
                'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
                1,
                '2020-07-13T04:28:34Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'End of the Spear',
                'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-11-03T20:32:01Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'While She Was Out',
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
                1,
                '2020-08-22T12:02:31Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Craig Ferguson: Does This Need to Be Said?',
                'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.',
                1,
                '2020-10-16T22:10:16Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Hell to Eternity',
                'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
                1,
                '2020-03-17T20:12:50Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Campus Man',
                'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
                1,
                '2020-01-27T23:37:28Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Urusei Yatsura Movie 2: Beautiful Dreamer (Urusei Yatsura 2: Byûtifuru dorîmâ)',
                'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
                1,
                '2020-07-08T13:14:27Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Gilles'' Wife (La femme de Gilles)',
                'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
                1,
                '2020-02-22T18:52:47Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Romanzo Criminale',
                'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-09-02T04:55:45Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love the Hard Way',
                'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
                1,
                '2020-02-02T21:36:44Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Wolfman, The',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
                1,
                '2020-08-16T09:34:02Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Raisin in the Sun, A',
                'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
                1,
                '2020-03-07T01:07:57Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love, Money, Love',
                'In congue. Etiam justo. Etiam pretium iaculis justo.',
                1,
                '2020-12-25T06:04:22Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Adaptation',
                'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                1,
                '2020-11-24T21:18:51Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Killing of John Lennon, The',
                'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                1,
                '2021-01-10T07:17:23Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Great Guy',
                'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
                1,
                '2020-05-16T14:59:33Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'My Kingdom',
                'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
                1,
                '2021-01-22T20:52:36Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Desert Heat (Inferno)',
                'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-05-27T17:53:09Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'In Tranzit',
                'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
                1,
                '2020-06-21T00:36:26Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Nature Calls',
                'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
                1,
                '2020-06-19T07:15:13Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Godzilla: Tokyo S.O.S. (Gojira tai Mosura tai Mekagojira: Tôkyô S.O.S.)',
                'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                1,
                '2020-03-26T20:29:32Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Joshua',
                'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.',
                1,
                '2020-12-13T20:39:11Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Hitler: A Film from Germany (Hitler - ein Film aus Deutschland)',
                'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
                1,
                '2020-09-16T07:51:14Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Kids in the Hall: Brain Candy',
                'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
                1,
                '2020-02-02T00:41:18Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Cottage, The',
                'In congue. Etiam justo. Etiam pretium iaculis justo.',
                1,
                '2020-09-27T10:21:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'The Halloween That Almost Wasn''t',
                'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.',
                1,
                '2020-12-10T11:43:42Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Beach, The',
                'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2021-01-09T06:28:06Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Lenny',
                'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-02-22T12:48:22Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'TINY: A Story About Living Small',
                'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
                1,
                '2020-12-27T07:05:27Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Basket Case 3: The Progeny',
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
                1,
                '2020-07-24T09:32:08Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'It! The Terror from Beyond Space',
                'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-04-12T16:35:37Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'See the Sea',
                'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
                1,
                '2020-08-30T03:16:39Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Beautiful Dreamer: Brian Wilson and the Story of ''Smile''',
                'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
                1,
                '2020-09-11T15:40:37Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'House I Live In, The',
                'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
                1,
                '2020-10-11T06:43:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Muppets, The',
                'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
                1,
                '2020-03-29T02:41:05Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Wildcats',
                'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
                1,
                '2021-01-21T13:36:06Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Piled Higher and Deeper',
                'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
                1,
                '2020-03-23T16:56:40Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Cross of Lorraine, The',
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
                1,
                '2020-10-26T00:40:52Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Onion Movie, The',
                'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
                1,
                '2020-07-07T00:47:00Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Execution of P, The (Kinatay)',
                'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
                1,
                '2020-03-12T09:02:44Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Caribe',
                'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
                1,
                '2020-12-17T12:34:38Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Club Paradise',
                'In congue. Etiam justo. Etiam pretium iaculis justo.',
                1,
                '2020-10-02T18:04:40Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Trojan Women, The',
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
                1,
                '2020-05-17T09:43:39Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Yes, But... (Oui, mais...)',
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
                1,
                '2020-12-03T05:19:31Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Sexy Nights of the Living Dead',
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
                1,
                '2020-10-24T05:35:44Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Suddenly, Last Summer',
                'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.',
                1,
                '2020-03-17T10:24:36Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Bunker, The',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
                1,
                '2020-12-03T09:53:50Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Brute (Bandyta)',
                'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
                1,
                '2020-05-29T01:56:43Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Miss Météo',
                'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2020-10-28T05:09:19Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Hoodwinked!',
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
                1,
                '2020-04-09T16:22:33Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'No One Dies in Lily Dale',
                'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
                1,
                '2020-05-08T20:41:22Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Men to Kiss',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
                1,
                '2020-05-16T01:45:17Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Munyurangabo',
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
                1,
                '2020-04-13T08:25:10Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love Is All You Need (Den skaldede frisør)',
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
                1,
                '2021-01-21T00:21:33Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Soapdish',
                'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-04-19T07:56:06Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'I Will Buy You (Anata kaimasu)',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
                1,
                '2020-06-19T14:26:33Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Year and a Half in the Life of Metallica, A',
                'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
                1,
                '2020-12-31T15:34:03Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Mostly Martha (Bella Martha)',
                'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
                1,
                '2020-05-22T08:36:01Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'African Queen, The',
                'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                1,
                '2020-04-01T16:19:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'My Stepmother Is an Alien',
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
                1,
                '2020-12-28T03:19:19Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Never Again',
                'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
                1,
                '2020-09-26T11:00:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Red Planet',
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
                1,
                '2020-05-04T14:09:09Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Volga - Volga',
                'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
                1,
                '2021-01-01T18:16:04Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Fever',
                'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
                1,
                '2020-10-26T18:15:08Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Lights Out',
                'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
                1,
                '2020-07-12T18:44:46Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Emma',
                'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
                1,
                '2020-12-24T15:39:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Calamari Union',
                'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.',
                1,
                '2020-04-20T16:04:15Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Switchback',
                'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
                1,
                '2021-01-03T03:58:41Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Fixed Bayonets!',
                'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
                1,
                '2020-05-19T23:08:57Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Tennessee Johnson',
                'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
                1,
                '2020-10-14T03:59:20Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'John Garfield Story, The',
                'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
                1,
                '2020-05-09T21:42:10Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Walking Tall Part II',
                'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-11-26T10:22:34Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Complicit',
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.',
                1,
                '2020-09-30T23:04:24Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Zombie Holocaust (a.k.a. Doctor Butcher M.D.) (Zombi Holocaust)',
                'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
                1,
                '2020-07-12T21:35:30Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'White Sheik, The (Sceicco bianco, Lo)',
                'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
                1,
                '2020-09-18T06:46:45Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Hatchet II',
                'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.',
                1,
                '2020-10-24T15:23:31Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Mendy: A Question of Faith',
                'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-03-26T11:50:54Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Citizen Koch',
                'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
                1,
                '2020-12-04T10:02:34Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Cattle Queen of Montana',
                'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
                1,
                '2020-06-03T11:16:19Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Chance of a Lifetime, The',
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
                1,
                '2020-07-18T13:51:21Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Mumford',
                'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                1,
                '2020-11-01T00:32:11Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Love and Sex under Nazi Occupation (Amour et sexe sous l''occupation) ',
                'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
                1,
                '2020-02-11T05:42:27Z'
        );
insert into post (title, text, "creatorId", "createdAt")
values (
                'Other One, The',
                'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
                1,
                '2020-02-02T02:52:57Z'
        );
        `);
    }
    public async down(_: QueryRunner): Promise<void> {
    }
}
